/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, OptionSelect, DateSelect, waitForUXLoading, ensure, SIT } from '../../../lib';
import { PaymentsPages } from '../../../pages/IDEALX';
import { Menu } from '../../../config/menu';

@log export class BalancesPage extends Page {
    constructor() {
        super();
    }
    @component('//a[contains(@href,"#/accounts/new-balance")]') public accountBalanceTab: Button;
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
    @component('//*[@id="labelViewTranHistory-0"]/span') public viewTransactionHistoryLink: Button;
    @component('//*[@data-mat-icon-name="icon__widget-collapse"]') public collapseBtn: Button;
    
    //"Business Date" in list after click Show daily summary
    @component('//p[@id="daily-summary-item-bizDate-0"]') public dailySummaryItemBizDate: TextInput;
    //"Available Balance" in list after click Show daily summary
    @component('//p[@id="daily-summary-item-availableBal-0"]') public dailySummaryItemAvailableBal: TextInput;
    //account detail info at "View Transaction History" screen
    @component('//p[@id="accountDetail-item-label-0"]') public accountDetailItemLabel: TextInput;
    @component('//button[@id="actionBtn-0"]') public dailySummaryItemActionButton: TextInput;
    @component('//dbs-new-balance/div/dbs-new-balance-single/div/div[1]/div[1]/div[2]/p-vertical-tabs/section/div/ul/li[2]/div/div[1]/div/span') public actionTransferOwnAccountButton: TextInput;
    @component('//dbs-new-balance-single/div/div[1]/div[1]/div[2]/p-vertical-tabs/section/div/ul/li[3]/div/div[1]/div/span') public actionSinglePaymenttButton: TextInput;
    @component('//li[@id="exportExcelPagePrint"]') public printButton: Button;
    @component('//paper-button[@class="cancel-button"]') public cancelButtonInPrint: Button;
    @component('//*[@data-mat-icon-name="icon-search-svg"]') public filtAccButton: Button;
    @component('//input[@id="chequeState-filter"]') public chequeStateFilter: TextInput;
    @component('//*[@class="num"]') public accountNum: TextInput;
    @component('//*[@id="fromAccount"]') public orgSelect: Button;
    @component('//*[@class="subsidiary-item"]') public subsiOrgSelect: Button;
    @component('//dbs-new-balance/div/dbs-multi-accounts/div/div[1]/div/div/div/div[2]/div[1]/div/span[1]') public ccyButton: Button;
    @component('//*[@id="selected-currency"]') public ccySelect: Button;
        
    @component('//p-auto-complete/div/div[3]/ul/li[1]/div/span/span') public baseccy: Button;
    @component('//p-auto-complete/div/div[3]/ul/li[2]/div/span/span') public firstccy: Button;
    @component('//p-auto-complete/div/div[3]/ul/li[3]/div/span/span') public secendccy: Button;

    @component('//*[@id="selectedCurrency"]') public currency: TextInput;
    @component('//*[@class="account-item"]') public accountItem: TextInput;
    @component('//input[@name="balance-defaultBalance"]') public availableBalacne: TextInput;


    @component('//p[@id="transactionDetail-tranDesc-0"]') public activitiesTxnDetail0: TextInput;


    //For IN Report as fraud
    @component('//*[@name="createMessage"]') public createMessage: Button;
    @component('//p-auto-complete[@formcontrolname="messageTo"]') public messageTo: TextInput;
    @component('//p-auto-complete[@formcontrolname="messageSubject"]') public messageSubject: TextInput;
    @component('//p-auto-complete[@formcontrolname="msgDetail"]') public msgDetail: TextInput;
    @component('//*[@name="submit"]') public submitBtn: Button;
    @component('//*[@class="dbs-snackbar__message"]') public successMsg: TextInput;

    // SAM secure message
    @component('//*[contains(@href,"/samweb/csr/common/securemessage/csr/retrieve")]') public secureMessage: Button;
    @component('//*[contains(@href,"/samweb/csr/common/securemessage/csr/view")]') public subjectLink: Button;
    @component('//*[@name="subject"]') public subjectValue: TextInput;
    @component('//html/body/table[2]/tbody/tr[9]/td[3]') public FromValue: TextInput;
    @component('//html/body/table[2]/tbody/tr[15]/td[3]') public receiceDateValue: TextInput;

    public async loadCondition() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.accountNum.element), this.accountNum.getTimeOut());
    }

    public async loadCondition4Search() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.modifySearchButton.element), this.modifySearchButton.getTimeOut());
    }

    public async loadCondition4ShowDailySummary() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.dailySummaryItemBizDate.element), this.dailySummaryItemBizDate.getTimeOut());
    }

    public async loadCondition4ViewTransactionHistory() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.accountDetailItemLabel.element), this.accountDetailItemLabel.getTimeOut());
    }

    public async loadConditionForBalancePage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.accountItem.element), this.accountItem.getTimeOut());
    }

    public async loadConditionForViewTxnPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.activitiesTxnDetail0.element), this.activitiesTxnDetail0.getTimeOut());
    }

    public async loadConditionForCreateMessagePage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.visibilityOf(this.messageTo.element), this.messageTo.getTimeOut());
        await browser.sleep(5000);
    }

    public async loadConditionForSecureMessage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.subjectLink.element), this.subjectLink.getTimeOut());
    }

    public async loadConditionForViewSecureMessage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.FromValue.element), this.FromValue.getTimeOut());
    }


    public async createICT(): Promise<void> {
        let _PaymentsPages = new PaymentsPages();
        let testDataExt = _PaymentsPages.fetchTestData('SG_testData.json');
        let reference: string = null;
        await _PaymentsPages.IntraCompanyTransferPage.loadCondition();
        await _PaymentsPages.IntraCompanyTransferPage.fromAccount.select(SIT ? testDataExt.IntraCompanyTransfer.SIT.fromAccount : testDataExt.IntraCompanyTransfer.UAT.fromAccount);
        await _PaymentsPages.IntraCompanyTransferPage.toAccount.select(SIT ? testDataExt.IntraCompanyTransfer.SIT.toAccount : testDataExt.IntraCompanyTransfer.UAT.toAccount);
        await waitForUXLoading();
        await _PaymentsPages.IntraCompanyTransferPage.amount.input(testDataExt.IntraCompanyTransfer.amountA1);
        await waitForUXLoading();
        await _PaymentsPages.IntraCompanyTransferPage.transactionNoteButton.jsClick();
        await _PaymentsPages.IntraCompanyTransferPage.transactionNoteInput.input(testDataExt.IntraCompanyTransfer.additionNote);
        await _PaymentsPages.IntraCompanyTransferPage.nextButton.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForPreviewPage();
        await _PaymentsPages.IntraCompanyTransferPage.submitButton.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.IntraCompanyTransferPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
            console.log('Reference of Create Transfer to own account via Balance Action:', reference);
        });

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForViewICTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.IntraCompanyTransferPage.amountValue).textContains(testDataExt.IntraCompanyTransfer.amountA1),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.transactionStatusValue).textIs(testDataExt.status.PendingApproval),
        ]);
    }

    public async createSinglePayment(): Promise<void> {
        let _PaymentsPages = new PaymentsPages();
        let testDataExt = _PaymentsPages.fetchTestData('SG_testData.json');
        let reference: string = null;
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testDataExt.TelegraphicTransfer.SIT.fromAccount : testDataExt.TelegraphicTransfer.UAT.fromAccount);
        await _PaymentsPages.TelegraphicTransferPage.currency.select(testDataExt.TelegraphicTransfer.paymentCurrency);
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testDataExt.TelegraphicTransfer.amountA1);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeTab.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.cognitiveContinueBtn.jsClickIfExist(); 
        await _PaymentsPages.TelegraphicTransferPage.Country.select(testDataExt.TelegraphicTransfer.Country);
        await _PaymentsPages.TelegraphicTransferPage.payeeBankID.select(testDataExt.TelegraphicTransfer.payeeBankID);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeAcctNumber.input(testDataExt.TelegraphicTransfer.newPayeeAcctNumber);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeName.input(testDataExt.TelegraphicTransfer.newPayeeName);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeNickname.input(testDataExt.TelegraphicTransfer.newPayeeNickname);
        await _PaymentsPages.TelegraphicTransferPage.payeeLocation.select(testDataExt.TelegraphicTransfer.payeeLocation);
        await _PaymentsPages.TelegraphicTransferPage.townCity.input(testDataExt.TelegraphicTransfer.townCity);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeAdd1.input(testDataExt.TelegraphicTransfer.newPayeeAdd1);
        await _PaymentsPages.TelegraphicTransferPage.bankChargesOur.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.paymentDetail.input(testDataExt.TelegraphicTransfer.paymentDetail);
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await browser.sleep(2000) //wait status fiele load

        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).textContains(testDataExt.TelegraphicTransfer.amountA1),
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textIs(testDataExt.status.PendingApproval),
        ]);
    }
}
