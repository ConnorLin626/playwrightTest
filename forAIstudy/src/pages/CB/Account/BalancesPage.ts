/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, OptionSelect, DateSelect, waitForUXLoading, ensure, SIT } from '../../../lib';
import { PaymentsPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu';

@log export class BalancesPage extends Page {
  constructor() {
    super();
  }

  @component('//button[@name="actionButtonPanel"]') public accountNameSortByButton: Button;
  @component('//button[@name="modify-search"]') public modifySearchButton: Button;
  @component('//input[@name="balance-account"]') public balanceAccountSelect: OptionSelect;
  @component('//p-auto-complete[@formcontrolname="organisationRes"]') public organisationSelect: OptionSelect;
  @component('//input[@id="balance-organisation"]') public fromAccountInput: TextInput;
  @component('//*[@id="balance-lastTwo-current"]') public lastTwoAndCurrent: Button;
  @component('//input[@id="balance-customize"]') public balanceCustomizeRadio: Button;
  @component('//date-picker[@formcontrolname="fromDateRes"]') public dateFromSelect: DateSelect;
  @component('//date-picker[@formcontrolname="toDateRes"]') public dateToSelect: DateSelect;
  @component('//input[@name="date-from"]') public dateFromInput: TextInput;
  @component('//input[@name="date-to"]') public dateToInput: TextInput;
  @component('//button[@name="search"]') public searchButton: Button;
  @component('//div[@id="balanceItem-0"]') public firstListItem: TextInput;
  @component('//*[@id="balanceItem-exampleAccountLabel-0"]') public firstAccountNum: TextInput;
  @component('//span[@id="labelShowSummary-0"]') public showDailySummaryLink: Button;
  @component('//button[@id="labelViewTranHistory-0"]') public viewTransactionHistoryLink: Button;
  //"Business Date" in list after click Show daily summary
  @component('//p[@id="daily-summary-item-bizDate-0"]') public dailySummaryItemBizDate: TextInput;
  //"Available Balance" in list after click Show daily summary
  @component('//p[@id="daily-summary-item-availableBal-0"]') public dailySummaryItemAvailableBal: TextInput;
  //account detail info at "View Transaction History" screen
  @component('//p[@id="accountDetail-item-label-0"]') public accountDetailItemLabel: TextInput;
  @component('//button[@id="actionBtn-0"]') public dailySummaryItemActionButton: TextInput;
  @component('//a[@id="labelTransferOwnAccount"]') public actionTransferOwnAccountButton: TextInput;
  @component('//a[@id="labelSingleTransfer"]') public actionSinglePaymenttButton: TextInput;
  @component('//li[@id="exportExcelPagePrint"]') public printButton: Button;
  @component('//paper-button[@class="cancel-button"]') public cancelButtonInPrint: Button;

  public async loadCondition() {
    await waitForUXLoading();
    await this.pageSwitchToUX();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.modifySearchButton.element), this.modifySearchButton.getTimeOut());
  }

  public async loadCondition4Search() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.searchButton.element), this.searchButton.getTimeOut());
  }

  public async loadCondition4ShowDailySummary() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.dailySummaryItemBizDate.element), this.dailySummaryItemBizDate.getTimeOut());
  }

  public async loadCondition4ViewTransactionHistory() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.accountDetailItemLabel.element), this.accountDetailItemLabel.getTimeOut());
  }

  public async createICT(): Promise<void> {
    let _PaymentsPages = new PaymentsPages();
    let testDataExt = _PaymentsPages.fetchTestData('SG_testData.json');
    let reference: string = null;
    await _PaymentsPages.intraCompanyTransferPage.loadCondition();
    await _PaymentsPages.intraCompanyTransferPage.toAccount.select(SIT ? testDataExt.IntraCompanyTransfer.SIT.toAccount : testDataExt.IntraCompanyTransfer.UAT.toAccount);
    await waitForUXLoading();
    await _PaymentsPages.intraCompanyTransferPage.amount.input(testDataExt.IntraCompanyTransfer.amountA1);
    await waitForUXLoading();
    await _PaymentsPages.intraCompanyTransferPage.transactionNoteButton.click();
    await _PaymentsPages.intraCompanyTransferPage.transactionNoteInput.input(testDataExt.IntraCompanyTransfer.additionNote);
    await _PaymentsPages.intraCompanyTransferPage.nextButton.click();
    await _PaymentsPages.intraCompanyTransferPage.loadConditionForPreviewPage();
    await _PaymentsPages.intraCompanyTransferPage.submitButton.click();
    await _PaymentsPages.intraCompanyTransferPage.loadConditionForSubmittedPage();
    await _PaymentsPages.intraCompanyTransferPage.getInfoReferenceID().then(text => {
      reference = text;
      console.log('Reference of Create Transfer to own account via Balance Action:', reference);
    });
    await ensure(_PaymentsPages.intraCompanyTransferPage).isUXSuccess();
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
    await _PaymentsPages.intraCompanyTransferPage.loadConditionForViewICTPaymentPage();
    await Promise.all([
      await ensure(_PaymentsPages.intraCompanyTransferPage.amountValue).textContains(testDataExt.IntraCompanyTransfer.amountA1),
      await ensure(_PaymentsPages.intraCompanyTransferPage.transactionStatusValue).textIs(testDataExt.status.PendingApproval),
    ]);
  }

  public async createSinglePayment(): Promise<void> {
    let _PaymentsPages = new PaymentsPages();
    let testDataExt = _PaymentsPages.fetchTestData('SG_testData.json');
    let reference: string = null;
    await _PaymentsPages.PaymentLocalOverseasPayeePage.loadCondition();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.currency.select(testDataExt.TelegraphicTransfer.paymentCurrency);
    await _PaymentsPages.PaymentLocalOverseasPayeePage.amount.input(testDataExt.TelegraphicTransfer.amountA1);
    await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeTab.jsClick();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.Country.select(testDataExt.TelegraphicTransfer.Country);
    await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeName.input(testDataExt.TelegraphicTransfer.newPayeeName);
    await _PaymentsPages.PaymentLocalOverseasPayeePage.payeeBankID.select(testDataExt.TelegraphicTransfer.payeeBankID);
    await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeAcctNumber.input(testDataExt.TelegraphicTransfer.newPayeeAcctNumber);
    await _PaymentsPages.PaymentLocalOverseasPayeePage.bankChargesOur.jsClick();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.paymentDetail.input(testDataExt.TelegraphicTransfer.paymentDetail);
    await _PaymentsPages.PaymentLocalOverseasPayeePage.nextButton.click();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForPrevewPage();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.submitButton.click();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForSubmittedPage();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.getInfoReferenceID().then(text => {
      reference = text;
    });
    await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage).isUXSuccess();
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
    await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();

    await Promise.all([
      await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.amountValue).textContains(testDataExt.TelegraphicTransfer.amountA1),
      await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.transactionStatus).textIs(testDataExt.status.PendingApproval),
    ]);
  }
}
